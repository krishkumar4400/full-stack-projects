"use client";

import { BookUserIcon } from "lucide-react";
import React from "react";
function Testimonial() {
  const testimonials = [
    {
      name: "Anonymous author",
      title: "Doing something",
      text: "I am really new to Tailwind and I want to give a go to make some page on my own. I searched a lot of hero pages and blocks online. However, most of them are not giving me a clear view or needed some HTML/CSS coding background to make some changes from the original or too expensive to have. I downloaded the copy of Tailus template which is very clear to understand at the last and you could modify the codes/blocks to fit perfectly on your purpose of the page.",
      image:
        "https://i.pinimg.com/1200x/c2/4e/27/c24e271f2f992fd7e62e8c1e8d9b3e2f.jpg",
    },
    {
      name: "Shekinah Tshikulila",
      title: "Software Engineer",
      text: "Tailus is redefining the standard of web design, with these blocks it provides an easy and efficient way for those who love beauty but may lack the time to implement it. I can only recommend this incredible wonder.",
      image:
        "https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg",
    },
    {
      name: "Khatab Wedaa",
      title: "Merakiol Creator",
      text: "Tailus is an elegant, clean, and responsive tailwind css components it's very helpful to start fast with your project.",
      image:
        "https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg",
    },
    {
      name: "Oketa Fred",
      title: "Fullstack Developer",
      text: "I absolutely love Tailus! The component blocks are beautifully designed and easy to use, which makes creating a great-looking website a breeze.",
      image:
        "https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg",
    },
    {
      name: "Rodrigo Aguilar",
      title: "Creator, TailwindAwesome",
      text: "I love Tailus ❤️. The component blocks are well-structured, simple to use, and beautifully designed. It makes it really easy to have a good-looking website in no time.",
      image:
        "https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg",
    },
    {
      name: "Zeki",
      title: "Founder of ChatExtend",
      text: "Using Tailkit!! has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.",
      image:
        "https://i.pinimg.com/736x/ce/31/42/ce3142d7a968fff3aecd0100572a5e8b.jpg",
    },
    {
      name: "Eric Ampire",
      title: "Mobile Engineer at @RBPNews , @GoogleGDE/Expert for Android",
      text: "Tailus templates are the perfect solution for anyone who wants to create a beautiful, functional website without any web design experience. The templates are easy to use, customizable, and responsive, and the support team is always available to help. I highly recommend Tailus templates to anyone who is looking to create a website.",
      image:
        "https://i.pinimg.com/736x/79/63/a5/7963a5246188d408b8f28961a0cf2b90.jpg",
    },
    {
      name: "Joseph Kitheka",
      title: "Fullstack Developer",
      text: "Tailur has transformed the way I develop web applications. Their extensive collection of UI components, blocks, and templates has significantly accelerated my workflow. The flexibility to customize every aspect allows me to create unique user experiences. Tailus is a game-changer for modern web development!",
      image:
        "https://i.pinimg.com/736x/8e/c1/f8/8ec1f80db272047cedf4c20263114387.jpg",
    },
    {
      name: "Roland Tubonge",
      title: "Software Engineer",
      text: "Tailus is so well designed that even with a very poor knowledge of web design you can do miracles. Let yourself be seduced!",
      image:
        "https://i.pinimg.com/1200x/08/a2/41/08a2413b771b729a9f9df20fa97be52a.jpg",
    },
    {
      name: "Jane Doe",
      title: "UX Designer",
      text: "The intuitive interface and powerful features of this platform have revolutionized my design process. Highly recommend for any creative professional!",
      image:
        "https://i.pinimg.com/736x/b0/7b/cc/b07bcc19e5d06dfb888c3263724b8baa.jpg",
    },
    {
      name: "John Smith",
      title: "Frontend Developer",
      text: "Building responsive layouts has never been easier. This toolkit integrates seamlessly with my existing workflow, saving me countless hours.",
      image:
        "https://i.pinimg.com/736x/12/ec/d9/12ecd918607b1ccb9d46772435bb592f.jpg",
    },
  ];
  const anonymousFallbackImage =
    "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";
  return (
    <div id="testimonial" className="flex flex-col items-center my-20 scroll-my-12">
      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-400/10 rounded-full px-6 py-2">
        <BookUserIcon className="size-5 stroke-blue-600"/>
        <span>Testimonials</span>
      </div>
      <div className="font-sans flex flex-col items-center py-4 px-4 sm:px-6 lg:px-8">
        {}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-4 text-gray-900">
         Don't just take our words
        </h1>
        <p className="text-center max-w-2xl text-slate-700 my-4">Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review</p>

        {}

        {}
        <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 my-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md break-inside-avoid border border-gray-300 "
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    const target = e.target;
                    target.onerror = null;
                    target.src = anonymousFallbackImage;
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-900 ">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 ">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-base text-gray-700  leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Testimonial;
