export const errorHandle = (err, req, res, next) => {
    const status = err.status || 500;
    const message = status === 500 ? "Error interno del servidor" : err.message;

    res.status(status).json({ 
        error: {
            message,
            status
        },
    });
}