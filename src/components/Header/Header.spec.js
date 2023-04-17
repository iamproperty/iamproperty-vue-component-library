import { mount } from '@vue/test-utils'
import Header from './Header.vue'

describe('Header component', () => {

  const test = mount(Header, {
    propsData: {
      title: 'Page title',
      image: '/img/src/img.png'
    },
    slots: {
      default: '<p>Hello</p>',
      breadcrumb: '<ul class="breadcrumb"></ul>'
    }
  })

  it('renders the page title', () => {
    expect(test.html()).toContain('<h1>Page title</h1>')
  })

  it('renders the page description', () => {
    expect(test.html()).toContain('<p>Hello</p>')
  })

  it('renders the breadcrumb trail', () => {
    expect(test.html()).toContain('<ul class="breadcrumb"></ul>')
  })

  it('renders the image', () => {

    expect(test.find('iam-header').wrapperElement.shadowRoot.innerHTML).toContain('<source srcset=\"\" media=\"(min-width: 62em)\">')
    expect(test.find('iam-header').wrapperElement.shadowRoot.innerHTML).toContain('<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" alt=\"\" lazy=\"\">')
  })
})
