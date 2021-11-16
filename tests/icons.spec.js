import { shallowMount } from '@vue/test-utils'
import Icon from '@/foundations/Icon/Icon.vue'

describe('Icon component', () => {
  it('renders the email Icon by default', () => {
    const test = shallowMount(Icon, {
      propsData: { }
    })
    
    expect(test.html()).toContain('<title>email</title>')
    expect(test.html()).toContain('<use xlink:href="#icon-email-bg" class="icon__bg"></use>')
    expect(test.html()).toContain('<use xlink:href="#icon-email-fill" class="icon__fill"></use>')
    expect(test.html()).toContain('<use xlink:href="#icon-email-outline" class="icon__outline"></use>')
  })

  it('renders the correct logo when an ID is passed', () => {
    const test = shallowMount(Icon, {
      propsData: {
        id: 'pin'
      }
    })
    
    expect(test.html()).toContain('<title>pin</title>')
    expect(test.html()).toContain('<use xlink:href="#icon-pin-bg" class="icon__bg"></use>')
    expect(test.html()).toContain('<use xlink:href="#icon-pin-fill" class="icon__fill"></use>')
    expect(test.html()).toContain('<use xlink:href="#icon-pin-outline" class="icon__outline"></use>')
  })
})
