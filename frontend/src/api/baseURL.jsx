let baseURL; 
if (process.env.NODE_ENV == 'development'){
    baseURL = 'http://127.0.0.1:7000';
} else if (process.env.NODE_ENV == 'production'){
    baseURL = 'http://192.168.15.184:9000'
}

export default baseURL; 