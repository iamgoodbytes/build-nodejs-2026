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
    try {
        let message = new Message();
        message.text = req.body.message.text;
        message.username = req.body.message.user;
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
