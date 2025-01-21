#!/usr/bin/env node

const fs = require("fs");
const FILE = "tasks.json";
address = 0;

const loadtasks = () => {
  data = fs.readFileSync(FILE);
  return JSON.parse(data);
};

const addtasks = (taskinfo) => {
  taskinfo.id = address++;
  const existing = loadtasks();
  existing.push(taskinfo);
  fs.writeFileSync(FILE, JSON.stringify(existing));
};

const savetasks = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data));
};

const params = process.argv;

const operation = params[2];

switch (operation) {
  case "add":
    if (params[4]) {
      const Curr = new Date();

      task = {
        taskname: params[3],
        status: 0,
        description: params[4],
        createdAt: Curr.toISOString(),
        updatedAt: Curr.toISOString(),
      };
      addtasks(task);
      console.log("Task added sucessfully");
    } else {
      console.log("Give task name");
    }
    break;

  case "update":
    const Curr = new Date();

    id = params[3];
    data = loadtasks();
    data[id - 1].taskname = params[4];
    data[id - 1].updatedAt = Curr.toISOString();
    savetasks(data);
    break;
  case "delete":
    id = params[3];
    data = loadtasks();
    data.splice(id - 1, 1);
    savetasks(data);
    break;

  case "mark-in-progress":
    id = params[3];
    data = loadtasks();
    data[id - 1].status = 1;
    savetasks(data);
    break;

  case "mark-done":
    id = params[3];
    data = loadtasks();
    data[id - 1].status = 2;
    savetasks(data);
    break;

  case "list":
    param = params[3];
    data = loadtasks();
    if (param) {
      switch (param) {
        case "done":
          for (var i = 0; i < data.length; i++) {
            if (data[i].status == 2) {
              console.log(data[i].taskname);
            }
          }
          break;
        case "todo":
          for (var i = 0; i < data.length; i++) {
            if (data[i].status == 0) {
              console.log(data[i].taskname);
            }
          }
          break;
        case "in-progress":
          for (var i = 0; i < data.length; i++) {
            if (data[i].status == 1) {
              console.log(data[i].taskname);
            }
          }
          break;
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].taskname);
      }
    }
    break;

  default:
    console.log("Use task add <name> to add tasks ");
}
