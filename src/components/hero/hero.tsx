const Hero = () => {
  return (
    <section className="bg-bg-page text-center px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-primary-strong bg-clip-text text-transparent">
          Discover Amazing Recipes
        </h1>

        {/* Description */}
        <p className="text-text-muted text-lg md:text-xl leading-relaxed">
          Explore thousands of free recipes from around the world. Search by
          name, ingredient, or category to find your next favorite dish.
        </p>
      </div>
    </section>
  );
};

export default Hero;