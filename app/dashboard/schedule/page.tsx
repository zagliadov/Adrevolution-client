"use client";

import { ResourceStore, ProjectModel } from "@bryntum/calendar";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGetUsersOfCompany } from "@/app/lib/queries/company";
import {
  transformUsersToEvents,
  transformUsersToResources,
} from "@/app/lib/utils";
import { Resource, Event } from "@/app/lib/definitions";

const Calendar = dynamic(() => import("@/app/ui/Calendar/Calendar"), {
  ssr: false,
});

export default function Schedule() {
  const calendarRef = useRef(null);
  const { data: users, isLoading, error } = useGetUsersOfCompany();
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [resourceStore, setResourceStore] = useState<ResourceStore | null>(
    null
  );
  const [project, setProject] = useState<ProjectModel | null>(null);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading users...");
    }
    if (error) {
      console.error("Error loading users:", error);
    }
    if (users) {
      console.log("Users loaded:", users);
      const transformedResources = transformUsersToResources(users);
      const transformedEvents = transformUsersToEvents(users);
      setResources(transformedResources);
      setEvents(transformedEvents);
    }
  }, [users, isLoading, error]);

  useEffect(() => {
    if (resources.length > 0 && events.length > 0) {
      const newResourceStore = new ResourceStore({ data: resources });
      const newProject = new ProjectModel({
        resourceStore: newResourceStore,
        eventStore: { data: events },
        assignmentStore: {},
        dependencyStore: {},
      });

      setResourceStore(newResourceStore);
      setProject(newProject);

      const loadData = async () => {
        await newProject.commitAsync();
        console.log("Project committed:", newProject);
        console.log("ResourceStore data:", newResourceStore.records);
      };

      loadData();
    }
  }, [resources, events]);

  return (
    <Calendar
      calendarRef={calendarRef}
      project={project}
      startDate={new Date(2024, 5, 18)}
      endDate={new Date(2024, 5, 25)}
      viewPreset="dayAndWeek"
      columns={[{ text: "Name", field: "name", width: 130 }]}
    />
  );
}
