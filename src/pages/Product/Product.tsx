import PageNav from "../../components/PageNav";

export default function Product() {
  return (
    <main className='product'>
      <PageNav />
      <section>
        <img
          src='img-1.webp'
          alt='Yacht sailing near an island on a sunny day'
        />
        <div>
          <h2>JSXplorer, Your Compass in the Cloud</h2>
          <p>
            Discover the features that make tracking your travels effortless and
            fun. From city pinning to personalized journey journals, JSXplorer
            is your ultimate travel companion—minus the jet lag.
          </p>
        </div>
      </section>
    </main>
  );
}
