import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose"; // ИМЕННО ТАК!
import AdminJSExpress from "@adminjs/express";
import Post from "./models/Post.js";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Service from "./models/Service.js";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const app = express();

const adminJs = new AdminJS({
  resources: [
    {
      resource: Post,
      options: {
        properties: {
          body: { type: "richtext" },
        },
      },
    },
    {
      resource: Service,
      options: {
        properties: {
          body: { type: "richtext" },
        },
      },
    },
    {
      resource: User,

    },
    {
      resource: Doctor,

    },
  ],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

app.use(adminJs.options.rootPath, adminRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb://admin:secret@localhost:27017/your_database_name?authSource=admin"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`AdminJS доступен по http://localhost:${PORT}/admin`);
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err);
  });
