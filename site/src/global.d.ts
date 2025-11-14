declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

interface Flavoring<FlavorT> {
  _type?: FlavorT;
}
declare type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;