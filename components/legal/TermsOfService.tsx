import React from 'react';
import LegalPageShell from './LegalPageShell';

const TermsOfService: React.FC = () => (
  <LegalPageShell
    title="Terms of Service"
    updated="July 2026"
    path="/terms"
    seoDescription="The terms that apply to using mbai-group.com and the ventures and demos hosted on it."
  >
    <section>
      <h2>Who this covers</h2>
      <p>
        These terms apply to <strong>mbai-group.com</strong>, operated by Mohanad Barakat / MB AI Group (MBAI
        Solutions), and to the ventures and interactive demos embedded on it. Each individual venture (AutoLeadss,
        Virlo Studio, IBNI, TUT) may publish its own additional terms on its own domain when it launches publicly.
      </p>
    </section>

    <section>
      <h2>The interactive demos</h2>
      <p>
        Most of the projects shown under "Live Work" are <strong>working, interactive demos or in-development
        concept previews</strong>, clearly labeled as such on each card. They're built to demonstrate real product
        thinking and are not warranted to be bug-free, complete, or continuously available.
      </p>
    </section>

    <section>
      <h2>Testimonials you submit</h2>
      <p>
        By submitting the "Share Your Result" form, you confirm the information is accurate and give us permission to
        review it and, if approved, display your name, role, company, and quote on this site. You can ask us to
        remove it at any time — see the Privacy Policy for how.
      </p>
    </section>

    <section>
      <h2>No professional advice</h2>
      <p>
        Nothing on this site constitutes financial, legal, or investment advice. Figures and case-study outcomes
        described on the site reflect specific client engagements and aren't a guarantee of results for any other
        business.
      </p>
    </section>

    <section>
      <h2>Contact</h2>
      <p>Questions about these terms? Email <strong>mohanad.barakat@mbai-group.com</strong>.</p>
    </section>
  </LegalPageShell>
);

export default TermsOfService;
