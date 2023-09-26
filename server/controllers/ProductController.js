import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { uploadPicture } from "../middleware/UploadPictureMiddleware.js";

const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    try {
        const upload = uploadPicture.single("productPicture");
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ msg: { message: "gagal upload gambar" } });
            } else {
                const { name, description, price, qty } = req.body;
                const image = req.file.filename; // Ambil nama file gambar dari req.file

                const product = await prisma.product.create({
                    data: {
                        id: uuid(),
                        name: name,
                        description: description,
                        price: price,
                        qty: qty,
                        image: image, // Masukkan nama file gambar ke dalam data
                        user_id: req.user.id,
                    },
                });
                console.log(product)
                return res.status(201).json(product);
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};


export { createProduct };
