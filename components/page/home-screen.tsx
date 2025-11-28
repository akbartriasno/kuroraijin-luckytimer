'use client'

import {motion} from "framer-motion";
import {Button, Form, InputOtp} from "@heroui/react";
import {useState} from "react";
import {ShoppingCart} from "lucide-react";

interface HomeScreenProps {
  onStart: () => void
}

const products = [
  {
    id: 1,
    name: "Head Lamp Kuro Raijin R60 (Performance) H4",
    price: "Rp2.850.000",
    imageUrl: "/images/product/product_1.webp",
  },
  {
    id: 2,
    name: "Headlamp Square 1.5\" RX15",
    price: "Rp1.650.000",
    imageUrl: "/images/product/product_2.webp",
  },
  {
    id: 3,
    name: "Fog Lamp Kuro Raijin R45 Performance",
    price: "Rp1.950.000",
    imageUrl: "/images/product/product_3.webp",
  },
  {
    id: 4,
    name: "Mini Projie Kuro Raijin R03 Triple Lens (2 x 75W)",
    price: "Rp2.300.000",
    imageUrl: "/images/product/product_4.webp",
  },
  // {
  //   id: 5,
  //   name: "Head Lamp Kuro Raijin RH4",
  //   price: "Rp1.055.000",
  //   imageUrl: "/images/product/product_5.webp",
  // },
];

export default function HomeScreen({onStart}: HomeScreenProps) {
  const [otp, setOtp] = useState("");

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }
  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.6, ease: "easeInOut" as const},
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-12 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      <div className="min-h-[40vh]">
        <motion.div className="text-center mb-12 mt-8" variants={itemVariants}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider digital-flicker">LUCKY TIMER</h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base tracking-widest uppercase">
            Precision Timing Challenge
          </p>

        </motion.div>

        <motion.div variants={itemVariants}>
          <Form
              className="flex flex-col items-center gap-12"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const rawOtp = formData.get("otp");

                setOtp(typeof rawOtp === "string" ? rawOtp : "");
                onStart();
              }}
          >
            <InputOtp
                isRequired
                aria-label="OTP input field"
                length={6}
                size="lg"
                name="otp"
                placeholder="Enter code"
                className="mx-auto"
                allowedKeys="^.*$"
                autoFocus={true}
            />
            <Button
                size="lg"
                type="submit"
                variant="bordered"
                className={"glow-pulse"}
            >
              Start The Game
            </Button>
            {otp && <div className="text-small text-default-500">Game code submitted: {otp}</div>}
          </Form>
        </motion.div>
      </div>

      {/* Product List Section */}
      <div className="mt-24 font-mono container">
        <h2 className="text-xl font-bold mb-8">Our Products</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
              <motion.div
                  key={product.id}
                  className="border border-transparent hover:border-accent hover:p-2 p-0 hover:bg-white hover:text-black text-left"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
              >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-75 object-cover"
                />
                <p className="text-sm mt-2">{product.name}</p>
                <p className="font-bold mt-1">{product.price}</p>
              </motion.div>
          ))}
        </div>

        {/* "Lihat Produk lainnya" Button */}
        <Button className="flex justify-center items-center gap-2 mt-12">
          <ShoppingCart size={18} />
          Lihat Produk lainnya
        </Button>
      </div>

      {/* About Section */}
      <div className="mt-12 font-mono container">
        <h2 className="text-xl font-bold font-mono">About this Website</h2>
        <p className="text-sm text-muted-foreground mt-4">
          The Lucky Timer Challenge is a precision timing game. The goal is to stop the timer exactly at 10.00 seconds to win a door prize.
        </p>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-sm text-muted-foreground w-full">
        <p>&copy; 2025 Kuro Raijin Lucky Timer Challenge. All Rights Reserved.</p>
      </footer>
    </motion.div>
  );
}