import app from "./server";
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`server started at ${PORT}`)
})