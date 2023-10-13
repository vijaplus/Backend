import companyType from "../../controllers/apiPublic/companyType";
import businessType from "../../controllers/apiPublic/businessType";

const publicRoutes = [
  {
    method:"get",
    path:"/api/company-type",
    controller: companyType
  },
  {
    method:"get",
    path: "/api/business-type",
    controller: businessType
  }
];

export default publicRoutes;