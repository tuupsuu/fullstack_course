const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	var total = 0
	blogs.forEach(blog => {
		total += blog.likes
	})
	return total
}

const favoriteBlog = (blogs) => {
	var fav = { title: "", author: "", likes: 0 }
	blogs.forEach(blog => {
		if (blog.likes > fav.likes) {
			fav = blog
		}
	})
	return { title: fav.title, author: fav.author, likes: fav.likes }
}

const mostBlogs = (blogs) => {
	var authors = new Map()
	blogs.forEach(blog => {
		if (authors.get(blog.author) == null) {
			authors.set(blog.author, 1)
		} else {
			authors.set(blog.author, authors.get(blog.author) + 1)
		}
	})

	var most = { author: "", blogs: 0 }
	for (let auth of authors.entries()) {
		if (auth[1] > most.blogs) {
			most = { author: auth[0], blogs: auth[1] }
		}
	}
	return { author: most.author, blogs: most.blogs }
}

const mostLikes = (blogs) => {
	var authors = new Map()
	blogs.forEach(blog => {
		if (authors.get(blog.author) == null) {
			authors.set(blog.author, blog.likes)
		} else {
			authors.set(blog.author, authors.get(blog.author) + blog.likes)
		}
	})

	var most = { author: "", likes: 0 }
	for (let auth of authors.entries()) {
		if (auth[1] > most.likes) {
			most = { author: auth[0], likes: auth[1] }
		}
	}
	return { author: most.author, likes: most.likes }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
