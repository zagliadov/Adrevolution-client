export enum IFormField {
  ID = "id",
  USER_ID = "userId",
  COMPANY_ID = "companyId",
  EMAIL = "email",
  PASSWORD = "password",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  LAST_LOGIN = "lastLogin",
  STREET_ADDRESS = "streetAddress",
  PROVINCE = "province",
  POSTAL_CODE = "postalCode",
  LABOUR_COST = "labourCost",
  COST_UNIT = "costUnit",
  PHONE_NUMBER = "phoneNumber",
  INDUSTRY = "industry",
  WEBSITE_URL = "websiteURL",
  COMPANY_NAME = "name",
  COMPANY_EMAIL = "email",
  TEAM_SIZE = "teamSize",
  ESTIMATED_ANNUAL_REVENUE = "estimatedAnnualRevenue",
  TOP_PRIORITY = "topPriority",
  HEARD_ABOUT_US = "heardAboutUs",
  STREET1 = "street1",
  STREET2 = "street2",
  CITY = "city",
  STATE = "state",
  POSTCODE = "postCode",
  BUSINESS_HOURS = "businessHours",
  COUNTRY = "country",
  TIMEZONE = "timezone",
  DATE_FORMAT = "dateFormat",
  TIME_FORMAT = "timeFormat",
  FIRST_DAY_OF_WEEK = "firstDayOfWeek",
  PERMISSION = "permission",
  PERMISSION_LEVEL = "permissionLevel",
  INVITER_FIRST_NAME = "inviterFirstName",
  INVITER_LAST_NAME = "inviterLastName",
}

export enum CompanyType {
  Transportation = "Transportation",
}
export enum TransportCompanyType {
  FreightTransportCompany = 'Freight Transport Company',
  PassengerTransportCompany = 'Passenger Transport Company',
  LogisticsAndSupplyChainCompany = 'Logistics and Supply Chain Company',
  CourierAndDeliveryService = 'Courier and Delivery Service',
  MovingAndRelocationCompany = 'Moving and Relocation Company',
  MaritimeShippingCompany = 'Maritime Shipping Company',
  AirCargoCompany = 'Air Cargo Company',
  RailTransportCompany = 'Rail Transport Company',
  IntermodalTransportCompany = 'Intermodal Transport Company',
  PublicTransportCompany = 'Public Transport Company',
}

export enum PERMISSION {
  IS_ADMIN = "isAdmin",
  IS_OWNER = "isOwner",
}

export enum COMMUNICATION {
  SURVEYS = "surveys",
  ERROR_MESSAGE = "errorMessage",
}

export enum PERMISSION_LEVEL {
  LIMITED_WORKER = "LIMITED_WORKER",
  WORKER = "WORKER",
  DISPATCHER = "DISPATCHER",
  MANAGER = "MANAGER",
  CUSTOM = "CUSTOM",
  COMPANY_OWNER = "COMPANY_OWNER",
}

export interface ISignUpData {
  [IFormField.EMAIL]: string;
  [IFormField.PASSWORD]: string;
}

export interface ISignInData {
  [IFormField.EMAIL]: string;
  [IFormField.PASSWORD]: string;
}

export interface IUserProfileData {
  [IFormField.FIRST_NAME]: string;
  [IFormField.LAST_NAME]: string;
}
export interface ICompanyProfileData {
  [IFormField.PHONE_NUMBER]: string;
  [IFormField.INDUSTRY]: string;
}

export interface IBusinessData {
  [IFormField.COMPANY_NAME]: string;
  [IFormField.TEAM_SIZE]: string;
  [IFormField.ESTIMATED_ANNUAL_REVENUE]: string;
}

export interface Resource {
  id: number | string;
  name: string;
  expanded?: boolean;
  children?: Resource[];
  email?: string;
  lastLogin?: string;
}

export interface Event {
  id: number | string;
  resourceId: string;
  startDate: Date;
  endDate: Date;
  name: string;
}

