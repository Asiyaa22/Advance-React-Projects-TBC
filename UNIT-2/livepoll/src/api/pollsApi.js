import axios from "axios";
const API = "/api";

export const fetchPolls = () => axios.get(`${API}/polls`).then(r => r.data);
export const createPoll = payload => axios.post(`${API}/polls`, payload).then(r => r.data);
export const vote = (pollId, optionId) => axios.post(`${API}/polls/${pollId}/vote`, { optionId }).then(r => r.data);
