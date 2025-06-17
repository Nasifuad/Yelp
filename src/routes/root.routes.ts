import { Router } from "express";
import { authRoute } from "./auth.route";
import { journalRoute } from "./journal.route";
import { productRoute } from "../modules/Product/product.route";

const router = Router();

const route = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/journal",
    route: journalRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
];

route.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
