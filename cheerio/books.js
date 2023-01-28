const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const url = 'https://books.toscrape.com/catalogue/category/books/mystery_3/index.html'
const base_url = 'https://books.toscrape.com/catalogue/category/books/mystery_3/'

const all_books = []
const getGenre = async (url) => {
  try {
    const result = await axios.get(url)
    const $ = cheerio.load(result.data)

    $('article').each(function() {
      title = $(this).find('h3 a').text()
      price = $(this).find('.price_color').text()
      stock = $(this).find('.availability').text().trim()
      all_books.push({title, price, stock})
    })

    if($('.next a').length > 0){
      next_page = base_url + $('.next a').attr('href')
      getGenre(next_page)
    } else {
      fs.writeFile('./books.json', JSON.stringify(all_books, null, 2), (err) => {
        if(!err) console.log('Done')
      })
    }
  } catch (error) {
    console.error(error)
  }
}

getGenre(url)