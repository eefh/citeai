export default async function (req, res) {
    try {
            const response = await fetch(process.env.LC_ENDPOINT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    assertion: req.body.assertion,
                }),
            });
            const data = await response.json();

            res.status(200).json({ result: data });
    } catch (error) {
        console.log(error)
    }

}
