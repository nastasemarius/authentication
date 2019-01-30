import vuetify from "vuetify";
import Vue from "vue";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import sinon from "sinon";
import chai from "chai";

import Diagrams from "@/components/diagrams/Diagrams.vue";
import Diagram from "@/components/diagrams/Diagram.vue";

Vue.use(vuetify);

const localVue = createLocalVue();

describe("Diagrams Component renders correctly", () => {
  it("is instance of Vue", () => {
    const wrapper = shallowMount(Diagrams, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("renders 5 diagram components", () => {
    const wrapper = shallowMount(Diagrams, {
      localVue,
      propsData: { diagramNumber: 5 }
    });
    expect(wrapper.findAll("appdiagram-stub").length).toBe(5);
  });
});

describe("Single Diagram components renders", () => {
  it("is vue instance", () => {
    const wrapper = mount(Diagram);
    wrapper.setProps({ diagramNumber: 5 });

    expect(wrapper.find(".title").element.textContent).toBe("5");
  });
});

describe("Diagrams lifecycle", () => {
  beforeEach(() => {});
  it("Mounted", () => {
    const addEventStub = sinon.stub(window, "addEventListener");

    const wrapper = shallowMount(Diagrams, {
      localVue
    });
    const vm: any = wrapper.vm;

    expect(addEventStub.calledWith("scroll", vm.handleScroll)).toBe(true);
  });
  it("Destroyed", () => {
    const wrapper = shallowMount(Diagrams, { localVue });
    const vm: any = wrapper.vm;
    //const handleScrollStub = sinon.stub(vm, "handleScroll");
    const removeEventStub = sinon.stub(window, "removeEventListener");

    wrapper.destroy();

    expect(removeEventStub.calledWith("scroll", vm.handleScroll));
    expect(removeEventStub.callCount).toBe(1);
  });
});

describe("Diagrams methods", () => {
  it("set objects should return true and set current objects", () => {
    const wrapper = shallowMount(Diagrams, { localVue });
    const vm: any = wrapper.vm;

    const objects: any[] = [{ id: 1 }, { id: 2 }];

    const getObjStub = (sinon.stub(vm, "getObjects") as any).returns(objects);

    const result = vm.setObjects();

    expect(result).toBe(true);
    expect(vm.currentObjects).toStrictEqual(objects);
  });

  it("set objects returns false and hasError is true", () => {
    const wrapper = shallowMount(Diagrams, { localVue });
    const vm: any = wrapper.vm;

    const getObjStub = (sinon.stub(vm, "getObjects") as any).returns([]);

    const result = vm.setObjects();

    expect(result).toBe(false);
    expect(vm.hasError).toBe(true);
  });
});
