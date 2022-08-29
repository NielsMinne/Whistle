/**
 * Meldet report component
 */

import { CATEGORIES, QSELECT } from '../consts';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Report from '../lib/Report';
import Location from '../lib/Location';
import Router from '../router';

class MeldetComponent extends Component {
  constructor() {
    super({
      name: 'meldet',
      routerPath: '/meldet',
    });
    this.location = new Location();
  }

  async renderAsync() {
    this.clearComponentContainer();
    await this.location.getCurrentPosition();

    const form = document.createElement('form');
    form.className = 'meldet__form';
    const container = document.createElement('div');
    container.className = 'form';

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'image-background',
      id: 'image-background2',
    }));
    this.componentContainer.appendChild(Elements.createHeaderNav({
      containerClassName: 'header-nav-container',
      title: 'WH<span>!</span>STLE MELDET',
      subTitle: 'Report harrasment',
    }));

    this.componentContainer.appendChild(Elements.createContainer({
      className: 'meldet__text',
      children: [
        Elements.createHeader({
          size: 3,
          textContent: 'REPORT TO <br> MELDET.ORG',
        }),
      ],
    }));

    container.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'text',
          id: 'title',
          required: true,
        }),
        Elements.createLabel({
          textContent: '<span class=\'form__label-name\'>Title (or keyword)</span>',
          className: 'form__label',
        }),
      ],
    }));

    container.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'text',
          id: 'adress',
          required: true,
        }),
        Elements.createLabel({
          textContent: '<span class=\'form__label-name\'>Adress</span>',
          className: 'form__label',
        }),
        Elements.createIcon({
          className: 'fas fa-compass fa-2x location-icon',
          onClick: async () => {
            await this.location.getCurrentPosition().then(async () => {
              await this.location.autoAdressFill(localStorage.getItem('currentPositionCoords').split(','));
              QSELECT('#adress').value = `${this.location.street}, ${this.location.number}, ${this.location.city}`;
            });
          },
        }),
      ],
    }));

    container.appendChild(Elements.createContainer({
      children: [
        Elements.createInput({
          className: 'form__input',
          type: 'text',
          id: 'descriptionMeldet',
          required: true,
        }),
        Elements.createLabel({
          textContent: '<span class=\'form__label-name\'>Description (optional)</span>',
          className: 'form__label',
        }),
      ],
    }));

    container.appendChild(
      Elements.createContainer({
        className: 'meldet-select',
        children: [
          Elements.createCategoryList({
            categories: CATEGORIES,
            className: 'category',
            placeholder: 'Choose a category',
          }),
        ],

      }),
    );
    container.appendChild(Elements.createButton({
      textContent: 'SUBMIT',
      className: 'button__invite',
      onClick: () => {
        const report = new Report();
        report.getInformation();
        report.SubmitReport();
        const container = QSELECT('.meldet-container');
        this.clearContainer(container);
        container.appendChild(
          Elements.createContainer({
            className: 'meldet-report-succes',
            children: [
              Elements.createHeader({
                textContent: 'Your Report has<br> been received!',
                size: 3,
              }),
              Elements.createHeader({
                textContent: 'Thank you for<br> letting us know',
                size: 3,
              }),
              Elements.createHeader({
                textContent: 'We will now return you Home...',
                size: 5,
              }),
            ],
          }),
        );
        setTimeout(() => {
          Router.navigate('/home');
        }, 5000);
      },
    }));

    form.appendChild(container);
    this.componentContainer.appendChild(form);
    return this.componentContainer;
  }
}

export default MeldetComponent;
