// Add custom module declaration for .txt files
declare module '*.txt' {
  const content: string;
  export default content;
}
