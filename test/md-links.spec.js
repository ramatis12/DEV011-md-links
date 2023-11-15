const mdLinks = require('../src/mdlinks.js');


describe('mdLinks', () => {

  it('Es una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('should be return the route of md files of Directory.', () => {
    const routeDirectory = 'C:\Users\sramirezm\Desktop\laboratoria\DEV011-social-network';
    const funcionFile = files.searchFiles(routeDirectory);
    expect(funcionFile).toContain('C:\\Users\\sramirezm\\Desktop\\laboratoria\\DEV011-social-network\\mock.md');
  });
});
