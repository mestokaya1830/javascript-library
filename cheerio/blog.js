const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const url = "https://www.jamesqquick.com/blog/";

const all_blogs = [];
const getBlogs = async (url) => {
  const result = await axios.get(url);
  const $ = cheerio.load(result.data);

  $(".overflow-hidden").each(function () {
    date = $(this).find("p").text().trim();
    content = $(this).find(".text-3xl").text().trim();
    all_blogs.push({ date, content });
  });
  fs.writeFile("./blog.json", JSON.stringify(all_blogs, null, 2), (err) => {
    if (!err) console.log("Done");
  });
};

getBlogs(url);
