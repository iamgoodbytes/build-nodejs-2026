// import Message model
import Message from "../../../models/api/v1/Message.js";

export const list = async (req, res) => {
    // only accept a plain string, so ?user[$ne]=x cannot inject a query operator
    const username = typeof req.query.user === "string" ? req.query.user : undefined;
    const messages = await Message.find(username ? { username: username } : {});

    const result = {
        status: "success",
        ...(username && { message: "Messages from user " + username }),
        data: {
            messages: messages,
        },
    };
    res.json(result);
};

export const get = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                status: "error",
                data: {
                    message: "Message not found.",
                },
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                message: message,
            },
        });
    } catch (err) {
        // an id that is not a valid ObjectId cannot match any message
        if (err.name === "CastError") {
            return res.status(404).json({
                status: "error",
                data: {
                    message: "Message not found.",
                },
            });
        }

        console.log(err);
        res.status(500).json({
            status: "error",
            data: {
                message: "Something went wrong.",
            },
        });
    }
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

export const destroy = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({
                status: "error",
                data: {
                    message: "Message not found.",
                },
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                message: message,
            },
        });
    } catch (err) {
        // an id that is not a valid ObjectId cannot match any message
        if (err.name === "CastError") {
            return res.status(404).json({
                status: "error",
                data: {
                    message: "Message not found.",
                },
            });
        }

        console.log(err);
        res.status(500).json({
            status: "error",
            data: {
                message: "Something went wrong.",
            },
        });
    }
};

export const update = async (req, res) => {
    try {
        const { text, user } = req.body.message ?? {};

        if (!text && !user) {
            return res.status(400).json({
                status: "error",
                data: {
                    message: "Provide message.text and/or message.user.",
                },
            });
        }

        const fields = {};
        if (text) fields.text = text;
        if (user) fields.username = user;

        const message = await Message.findByIdAndUpdate(req.params.id, fields, {
            new: true,
            runValidators: true,
        });

        if (!message) {
            return res.status(404).json({
                status: "error",
                data: {
                    message: "Message not found.",
                },
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                message: message,
            },
        });
    } catch (err) {
        // an id that is not a valid ObjectId cannot match any message
        if (err.name === "CastError") {
            return res.status(404).json({
                status: "error",
                data: {
                    message: "Message not found.",
                },
            });
        }

        console.log(err);
        res.status(500).json({
            status: "error",
            data: {
                message: "Something went wrong.",
            },
        });
    }
};
