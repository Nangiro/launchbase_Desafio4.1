const express = require('express')
const nunjucks = require('nunjucks')

const server = express ()
const posts = require("./data") //Pegando as infos dentro de data.js

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views",{
    express: server
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://cdn-images-1.medium.com/max/1200/1*TkXVfLTwsHdwpUEjGzdi9w.jpeg",
        name: "Rocketseat",
        description: "Mais do que uma plataforma de educação em tecnologia, somos uma comunidade incrível de programadores em busca do próximo nível. Uma startup criada para educar, inspirar e conectar programadores e empreendedores",
        technologies: [
            { name: "HTML" },
            { name: "CSS" },
            { name: "JavaScript" },
            { name: "React" },
            { name: "React Native" },
        ],
        links: [
            { name: "Github", url: "https://github.com/Rocketseat" },
            { name: "Facebook", url: "https://www.facebook.com/rocketseat" },
            { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial" }
        ]
    }

    return res.render("about", { about })
})

server.get("/courses", function(req, res){
    return res.render("courses", { items: posts }) //enviando items para ser usado no courses
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id;

    const post = posts.find(function(post){
        return post.id == id
    })

    if(!post){
        return res.render("not-found")
    }

    return res.render("course", { item:post } )
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });

server.listen(5000, function() {
    console.log("Server is running")
})