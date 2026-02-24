export default function errorMessage(req,res) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
}