import MPreviewer from "./index.vue";


const install = (Vue: any) => {
    Vue.component(MPreviewer.name,MPreviewer)
}
export default install