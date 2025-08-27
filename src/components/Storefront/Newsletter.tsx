export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container flexcol">
        <h2>Subscribe to our Newsletter</h2>
        <form className="newsletter-form flexitem">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="primary-button">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
