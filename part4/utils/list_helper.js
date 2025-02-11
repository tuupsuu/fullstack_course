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
		// console.log(blog)
		// console.log(fav)
		if (blog.likes > fav.likes) {
			fav = blog
		}
	})
	return { title: fav.title, author: fav.author, likes: fav.likes }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
}
