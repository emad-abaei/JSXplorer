// Uses the same styles as Product
import PageNav from "../../components/PageNav";

export default function Product() {
  return (
    <main className='product'>
      <PageNav />
      <section>
        <div>
          <h2>
            Chart Your Course
            <br />
            Without Breaking the Bank !
          </h2>
          <p>
            Affordable plans for every type of adventurer—whether you're a
            weekend wanderer or a seasoned explorer. Pick a plan, pack your
            bags, and let JSXplorer keep the memories alive.
          </p>
        </div>
        <img
          src='img-2.webp'
          alt="bird's eye view photography of boat on body of water"
        />
      </section>
    </main>
  );
}
