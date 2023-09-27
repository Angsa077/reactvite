import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { uploadPicture } from "../middleware/UploadPictureMiddleware.js";
import { fileRemover } from "../utils/fileRemover.js";

const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    try {
        const upload = uploadPicture.single("productPicture");
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ msg: { message: "gagal upload gambar" } });
            } else {
                const { name, description, price, qty } = req.body;
                const parsedQty = parseInt(qty); // Parse qty as an integer
                const parsedPrice = parseFloat(price); 
                const image = req.file.filename; // Ambil nama file gambar dari req.file

                const product = await prisma.product.create({
                    data: {
                        id: uuid(),
                        name: name,
                        description: description,
                        qty: parsedQty,
                        price: parsedPrice,
                        image: image,
                        user_id: req.user.id,
                    },
                });
                return res.status(201).json(product);
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        if (!products) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!product) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const upload = uploadPicture.single("productPicture");
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ msg: { message: "gagal upload gambar" } });
            } else {
                const { name, description, price, qty } = req.body;
                const image = req.file.filename;

                const productToUpdate = await prisma.product.findUnique({
                    where: {
                        id: req.params.id,
                    },
                });

                if (!productToUpdate) {
                    return res.status(404).json({ message: "Produk tidak ditemukan" });
                }

                const oldImageFilename = productToUpdate.image;

                const updatedProduct = await prisma.product.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        name: name,
                        description: description,
                        price: price,
                        qty: qty,
                        image: image,
                    },
                });

                fileRemover(oldImageFilename);
                return res.status(201).json(updatedProduct);
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteProduct = async (req, res) => {
     try {
         const productToDelete = await prisma.product.findUnique({
             where: {
                 id: req.params.id,
             },
         });
         if (!productToDelete) {
             return res.status(404).json({ message: "Produk tidak ditemukan" });
         }
         const oldImageFilename = productToDelete.image;
         await prisma.product.delete({
             where: {
                 id: req.params.id,
             },
         });
         fileRemover(oldImageFilename);
         return res.status(200).json({ message: "Produk berhasil dihapus" });
     } catch (error) {
        
     }
}

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
