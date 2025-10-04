export function notFound(req, res, next) {
    res.status(404).json({
        message: "We couldn’t find what you’re looking for. Please check the URL and try again.",
    });
}