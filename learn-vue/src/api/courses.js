import axios from "axios";

export function getCourses() {
  console.log(`123`);
  return axios.get("/api/courses").then((res) => res.data);
}
