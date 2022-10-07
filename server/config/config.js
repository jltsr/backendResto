const config = {
    env: process.env.NODE_ENV || 'development',
    port: 3001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    db_name : "db_resto",
    db_username : "postgres",
    db_password: "admin",
    URL_DOMAIN : '/resto',
    URL_IMAGE : '/resto/images/',
    URL_API : '/resto/api',
    UPLOAD_DIR : '/storages'
  }
  
export default config