import React from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../config/api_config';

// Setting default base url
axios.defaults.baseURL = API_ENDPOINT;


export const getGist = async (username) => {
    try {
        const data = await axios.get(`users/${username}/gists`);
        return data.data;
    } catch (error) {
        return []
    }
};

export const getGistForked = async (gistId) => {
    try {
        const data = await axios.get(`gists/${gistId}/forks`);
        return data.data;
    } catch (error) {
        return []
    }
};