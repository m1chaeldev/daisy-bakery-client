import axios from "axios";
import * as config from "./apiConfig";

export const getExample = (id, data) => {
    return axios.post(
        `${config.baseURL}/employees.php?id=${id}`,
        config.headers,
        {
            data
        }
    );
}