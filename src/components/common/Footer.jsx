import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="row company-info">
          <div className="footer-left-data">
            <a href="/aboutus"><span>Sobre nós</span></a>
            &nbsp;|&nbsp;
            <a href="/policy"><span>Política de Privacidade</span></a>
            {/* &nbsp;|&nbsp;
            <a href="/"><span>Como trabalhamos</span></a>
            &nbsp;|&nbsp;
            <a href="/"><span>Fale Conosco</span></a> */}
          </div>
          <div className="footer-right-data">
            {/* <span>+55 (16) 0000-0000</span>
            &nbsp;|&nbsp;
            <span>Rua Xxxxxx Xxxxxx, 0000</span>
            &nbsp;|&nbsp;
            <span>CNPJ 00.000.000/0000-00</span> */}
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;