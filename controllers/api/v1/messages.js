// import Message model
import Message from "../../../models/api/v1/Message.js";

export const list = async (req, res) => {
    const messages = await Message.find({});

    const result = {
        status: "success",
        data: {
            messages: messages,
        },
    };
    res.json(result);
};

export const get = (req, res) => {
    res.send("GET message with id " + req.params.id);
};

export const create = async (req, res) => {
    console.log(req.body);

    try {
        let message = new Message();
        message.text = req.body.text;
        message.username = req.body.username;
        await message.save();

        const result = {
            status: "success",
            data: {
                message: message,
            },
        };
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        const result = {
            status: "error",
            data: {
                message: "Something went wrong.",
            },
        };
        res.status(500).json(result);
    }
};
