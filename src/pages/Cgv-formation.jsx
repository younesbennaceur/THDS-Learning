import React from 'react'

export default function Cgv() {
  return (
    <div className='relative'>
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=600&fit=crop"
          alt="Conditions Générales de Vente"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Conditions Générales de Vente actions de formation
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Prix et Modalités de Paiement</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Le prix de la formation est défini dans le bulletin d'inscription. Il est calculé en fonction de la nature et de la durée de la formation sur la base de la grille tarifaire de THDS en vigueur au moment de la signature du bulletin d'inscription et accessible auprès de cette dernière.
              </p>
              <p>
                THDS se réserve la possibilité de modifier à tout moment ses grilles tarifaires pour tenir compte de l'évolution générale des prix et de la concurrence.
              </p>
              <p>
                Les prix s'entendent en euros toutes taxes comprises, ils sont fermes et non révisables.
              </p>
              <p>
                Le règlement du prix doit être réalisé sous un délai de paiement de trente (30) jours à compter de la date d'émission de la facture par chèque à l'ordre de THDS ou par virement bancaire sur le compte bancaire de THDS.
              </p>
              <p>
                En cas de non-paiement d'une facture à son échéance, le Client sera redevable de plein droit de pénalités de retard correspondant à trois (3) fois le taux d'intérêt légal en vigueur au jour de l'émission de la facture, à compter du jour suivant la date de règlement et jusqu'au règlement effectif et intégral de la facture sur le compte de THDS.
              </p>
              <p>
                Par ailleurs, le Client sera redevable du paiement d'une indemnité forfaitaire d'un montant de quarante (40) euros pour frais de recouvrement. Si les frais de recouvrement réellement engagés sont supérieurs à ce montant forfaitaire, une indemnisation complémentaire sur justification peut être demandée.
              </p>
              <p>
                THDS se réserve le droit de disposer librement des places retenues par le Client tant que l'intégralité du prix de la formation n'est pas totalement acquittée.
              </p>
            </div>

            <div className="mt-6 bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Prise en charge par un organisme collecteur</h3>
              <p className="text-gray-700 mb-3">En cas de prise en charge du paiement de la formation par un organisme collecteur, il appartient au Client :</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>De faire une demande de prise en charge avant le début de la formation et de s'assurer de la bonne fin de cette demande.</li>
                <li>De l'indiquer explicitement sur son bulletin d'inscription ou sur sa commande en y indiquant les coordonnées complètes de l'organisme collecteur.</li>
                <li>De transmettre l'accord de prise en charge avant la date de formation.</li>
                <li>De s'assurer de la bonne fin du paiement par l'organisme qu'il aura désigné.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                En cas de prise en charge du paiement de la formation par les Opérateurs de Compétences (OPCO), si THDS n'a pas reçu la prise en charge de l'OPCO au premier jour de la formation, le Client sera facturé de l'intégralité du prix de la formation.
              </p>
              <p className="text-gray-700 mt-3">
                En cas de non-paiement par l'organisme collecteur des frais de formation, le Client sera redevable de l'intégralité du prix de la formation et sera facturé du montant correspondant éventuellement majoré de pénalités de retard.
              </p>
              <p className="text-gray-700 mt-3">
                Si l'organisme collecteur ne prend en charge que partiellement le prix de la formation, le reliquat sera facturé au Client.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Propriété Intellectuelle et Droit d'Image</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                THDS peut citer le Client à titre de référence en indiquant de manière générique le champ d'intervention, sans pour autant préciser l'étendue des prestations demandées, dans le but de promouvoir ses produits et services.
              </p>
              <p>
                La réalisation des formations ne confère ni ne peut conférer au Client un quelconque droit de propriété intellectuelle sur le savoir-faire, les marques, les logos et autres signes distinctifs, ainsi que, sur tous les autres droits de propriété intellectuelle ou des droits connexes, notamment sur les contenus pédagogiques et les supports des formations (textes, graphismes, photographies, etc.) sur tout format (papier, numérique) dont est titulaire ou qu'utilise et exploite THDS.
              </p>
              <p className="font-semibold text-gray-900">
                Toute reproduction, représentation, imitation, exploitation ou utilisation, de quelque nature que ce soit, totale ou partielle, des formations proposées par THDS et/ou des éléments le composant par quelque procédé que ce soit, sur quelque support que ce soit et à quelque finalité que ce soit, non expressément et préalablement autorisée par THDS, est interdite et constituerait une contrefaçon exposant son auteur à des condamnations pénales et civiles et notamment aux sanctions prévues par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Durée</h2>
            <p className="text-gray-700 leading-relaxed">
              La durée des formations varie en fonction des critères propres à l'organisation du Client et des spécificités de chaque formation. Elle sera définie dans le bulletin d'inscription ou bon de commande.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Résiliation</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                En cas de manquement par l'une des parties à ses obligations, non réparé dans un délai de trente (30) jours à compter de la réception d'une lettre recommandée avec accusé de réception notifiant ledit manquement et déclarant l'intention de la partie lésée d'user du bénéfice de la présente clause résolutoire, l'autre partie pourra résilier de plein droit son engagement sans préjudice des dommages et intérêts auxquels elle pourrait prétendre.
              </p>
              <p>
                Le non-paiement du prix convenu entraîne également la résiliation de plein droit de tout accord contractuel conclu entre le Client et THDS, trente (30) jours après mise en demeure de payer par lettre recommandée avec avis de réception, restée infructueuse, sans préjudice des pénalités de retard qui sont dues de plein droit dès le premier jour de retard.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Protection des Données à Caractère Personnel</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Toute participation à une formation fera l'objet d'un traitement de données ayant pour finalité la gestion et le suivi des demandes de formation du Client. Ces informations sont à destination du service commercial de THDS, d'opérateurs de compétences et avec le consentement préalable du Client.
              </p>
              <p>
                Sauf opposition de la part du Client, des informations relatives à l'organisation d'autres sessions de formation peuvent lui être adressées. Dans le cadre de la gestion de l'inscription du Client à une formation, les données sont archivées pendant cinq (5) ans à l'issue de la prestation.
              </p>
              <p>
                Les données traitées dans le cadre d'opérations commerciales seront conservées pendant la durée des relations contractuelles, augmentée de trois (3) ans à des fins d'animation et de prospection, sans préjudice des obligations de conservation ou des délais de prescription.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Sous-traitance</h2>
            <p className="text-gray-700 leading-relaxed">
              THDS est autorisée à sous-traiter pour partie ou totalement l'exécution des prestations objets des présentes CGV. THDS demeure dans ce cas responsable à l'égard du Client de toutes les obligations résultant des présentes CGV.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Force Majeure</h2>
            <p className="text-gray-700 leading-relaxed">
              En cas de force majeure telle que définie par la jurisprudence française et par l'article 1218 du Code civil, rendant impossible l'exécution par l'une ou l'autre partie de ses obligations, la formation ou l'accès à la plateforme e-learning sera suspendue pour une durée maximale de trente (30) jours, à compter de la notification de la survenance de l'événement de force majeure par la partie empêchée d'exécuter ses obligations contractuelles. L'exécution de la prestation ou l'accès à la plateforme reprendra lors de la disparition de la cause de suspension.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Passé le délai de trente (30) jours, à défaut de reprise, la formation sera considérée comme définitivement éteinte.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Nullité</h2>
            <p className="text-gray-700 leading-relaxed">
              L'annulation d'une des stipulations des CGV n'entraînera pas l'annulation des CGV dans son ensemble que pour autant que la stipulation litigieuse puisse être considérée comme substantielle et déterminante, et que son annulation remette en cause l'équilibre général des CGV. En cas d'annulation d'une des stipulations des CGV, considérée comme non substantielle, THDS et le Client s'efforceront de négocier une clause économiquement équivalente.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Non-renonciation</h2>
            <p className="text-gray-700 leading-relaxed">
              Le silence du Client ou de THDS, sa négligence ou son retard à exercer un droit ou un recours qui leur est consenti en vertu des CGV ne doit jamais être interprété comme une renonciation à leurs droits et recours, tant et aussi longtemps que la prescription légale prévue pour l'exercice d'un tel droit ou recours n'est pas expirée.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">Loi Applicable et Compétence Jurisprudentielle</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGV sont régies par la loi française interne. Toute contestation qui n'aurait pas été réglée à l'amiable sera portée devant les tribunaux de Brunoy compétents selon les règles de droit commun.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}