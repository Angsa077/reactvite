import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password tidak cocok" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Email tidak terdaftar" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password salah" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: token,
            },
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password tidak cocok" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

const logout = async (req, res) => {
    try {
        const userId = req.user.id;
        await prisma.user.update({
            where: { id: userId },
            data: { token: null },
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { register, login, getUsers, logout, updateUser };
