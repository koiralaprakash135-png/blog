import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Hero Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://scontent.fbir7-1.fna.fbcdn.net/v/t39.30808-6/536274863_1372443164428496_7916595593628665255_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHEOf_Pe7UxOPeDodflgktxMcJPk4hV3gwxwk-TiFXeDLM6CUWrSvTEAtfauDUOyH2h4dRtASoKrmtF0m6GoeLd&_nc_ohc=nGfAYzsE0AkQ7kNvwHnWc5M&_nc_oc=AdktS57XULJmgluBL8St5Q80JX1_7KwdWMBfKlMPASGOxBvjMhkIcd5mruRBVeJcM00XJQBwkTRhCXBmD0Mh18X5&_nc_zt=23&_nc_ht=scontent.fbir7-1.fna&_nc_gid=_0w5Gtj0v3leVo1MgxOWNA&oh=00_AfV3KDxVpkQnilao2EvwA4rY7QCCu-kCQzaGASqC2Oq8WQ&oe=68BC6976" // 🔑 replace with your image
            alt="Prakash Koirala"
            className="w-40 h-40 mx-auto rounded-full object-cover shadow-xl border-4 border-white"
          />
          <h1 className="text-4xl font-extrabold text-gray-800 mt-6">
            Prakash Koirala
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Animal Science Student • Aspiring Veterinarian • Animal Lover
          </p>
        </motion.section>

        {/* About Me Section */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-8 text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">About Me</h2>
          <p className="mb-4">
            Hi 👋, I’m <span className="font-semibold">Prakash</span>, an
            <span className="font-semibold"> Animal Science student </span> and
            aspiring <span className="font-semibold">veterinarian</span>. My
            mission is to bridge science and compassion to create a better world
            for animals.
          </p>
          <p className="mb-4">
            My academic journey in veterinary sciences has allowed me to explore
            animal biology, welfare, and healthcare practices. Alongside
            studies, I’m working hands-on to help animals and develop practical
            skills that contribute to their well-being.
          </p>
          <p>
            Beyond academics, I love sharing knowledge, writing blogs, and
            raising awareness about veterinary practices and animal rights.
          </p>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            {
              title: "Veterinary Science",
              desc: "Hands-on experience with animal health and welfare.",
              icon: "🐾",
            },
            {
              title: "Animal Nutrition",
              desc: "Knowledge in livestock and pet nutrition management.",
              icon: "🌱",
            },
            {
              title: "Research & Writing",
              desc: "Passionate about sharing veterinary knowledge through blogs.",
              icon: "✍️",
            },
          ].map((skill, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <div className="text-4xl">{skill.icon}</div>
              <h3 className="text-lg font-semibold mt-3">{skill.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{skill.desc}</p>
            </div>
          ))}
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Let’s Connect</h2>
          <p className="mb-6">
            Interested in animal science, research, or just want to chat about
            veterinary life? Reach out to me!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:prakash@example.com"
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              📧 Email
            </a>
            <a
              href="https://linkedin.com/in/prakash"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://twitter.com/prakash"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              🐦 Twitter
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
