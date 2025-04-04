import { article, sanitizeHtml } from "../helpers";
import css from "./article.module.css";

// на 8 строке пример сочетания модульных и глобальных стилей для одного блока
const HTML_MARKUP = `
  <div class="${css.content}">
    <div class="${css["first-column"]}">
    <div class="reverse ${css.intro}">
      <h2>Voluptatem incidunt esse quod alias excepturi vero!</h2>
      <p>Numquam maxime totam id amet hic temporibus? Sequi, tenetur ut. Consectetur ea deleniti blanditiis dolor quo. Quos voluptatum, amet animi ea iste, adipisci maxime praesentium error harum ipsum corrupti enim.</p></div>
      <h3>1. Cupiditate placeat, natus et sint veritatis aperiam quod ipsa in?</h3>
      <p>Eos consectetur perferendis, tenetur esse earum enim tempore cumque perspiciatis ipsum deserunt necessitatibus dignissimos ab doloribus sit laborum. Eaque, quo? Exercitationem velit animi ipsam saepe a.</p>
      <h3>2. Est tempore libero aut commodi autem ipsum pariatur nulla omnis et.</h3>
      <p>Optio iure ex blanditiis sed facilis laborum nesciunt provident repudiandae exercitationem, libero, eligendi numquam temporibus dolores dolorem!  Qui sunt dignissimos et autem quisquam, deleniti eaque facere mollitia beatae dolor officia ullam aliquid quo quae reprehenderit deserunt <a href="https://www.dolor.sit">Dolor sit blog post</a> ducimus cum ipsam consequatur amet!. Aspernatur sed hic, soluta, veniam exercitationem nam laborum, provident omnis a fugit cupiditate velit:</p>
      <pre>
        <code>
        function every(bar, foo) {
          for (var i = 0; i < bar.length; i++) {
            if (!foo(bar[i]))
            return false;
          }
            return true;
          }
        </code>
      </pre>
      <p>Necessitatibus tempora laudantium iure vel aperiam eligendi dolores quo, atque velit omnis modi similique illum, facilis voluptas alias in sed consectetur reiciendis, iusto placeat magnam dolore rerum nesciunt maxime?  Quis omnis laboriosam dolorem aspernatur, nihil nostrum ipsa expedita commodi nam eveniet at dignissimos magni voluptates quo iusto ea aut rerum asperiores inventore deleniti esse in sint.</p>
      <h3>3. Possimus necessitatibus quis voluptatibus?</h3>
      <p>Quasi tempore dicta cupiditate itaque, sint aut voluptas pariatur voluptates, aliquam sit quos nisi nesciunt voluptate reiciendis exercitationem. Necessitatibus harum repellat, veniam non libero quaerat laudantium sit fugit error culpa ad neque quisquam tempore, repudiandae, quod ducimus quae? Quaerat voluptatem, maiores deserunt, temporibus laudantium voluptas corrupti totam inventore veritatis velit atque adipisci suscipit omnis minima consequatur beatae odit sunt pariatur consectetur!</p>
      <h3>4. Molestias!</h3>
      <p>Inventore possimus dolorem qui sit voluptas excepturi neque eius porro, similique distinctio, quia temporibus obcaecati at sapiente esse nemo nostrum! Aut cumque illo dolores dignissimos quibusdam culpa quidem, ducimus rem assumenda et esse hic laboriosam nam quae, itaque dolore magnam dolorem consectetur eius dolorum non.</p>
    </div>
    <div class="${css["second-column"]}">
      <h2>Nam, sit.</h2>
      <hr/>
      <h3>Repudiandae, voluptate nam.</h3>
      <p>Commodi, corporis laborum perspiciatis necessitatibus facere fugit libero impedit dicta reiciendis vel corrupti officiis eos. Recusandae laboriosam qui ad id molestiae, fugiat repellendus sunt sequi in.</p>
      <h4>Expedita voluptatibus magni placeat dolor esse!</h4>
      <p>Quo id, placeat expedita consectetur ullam sint laudantium debitis necessitatibus animi ipsum deserunt a inventore officia veniam optio ut error incidunt. Pariatur velit impedit consequuntur iste ipsam ut odit delectus adipisci, dicta quam iusto, aliquam explicabo vitae illo architecto nobis omnis qui natus?</p>
      <h4>Fugit explicabo ipsam illum laboriosam neque quae quia eos eaque iste.</h4>
      <p>Natus deleniti placeat voluptas repellat ducimus, a corrupti neque, eius debitis itaque inventore quos voluptate maxime ad possimus fugit dolore dolorum est.</p>
      <h4>Voluptatum porro exercitationem accusamus ratione corrupti harum enim ducimus, illum iure consequatur magni.</h4>
      <p>Et veritatis neque similique, saepe iste eaque sint officia, animi sapiente illum, amet odit officiis ut ducimus error delectus voluptate illo molestiae doloremque temporibus eius modi porro quibusdam vitae.</p>
      <h4>Aliquam, accusamus nihil?</h4>
      <p>Consequuntur, expedita eos, obcaecati corporis rerum ea deleniti eaque similique nisi atque nostrum distinctio sequi. Quasi aut sit sint, autem laborum cumque cum officia quam sed alias?</p>
      <h4>Iusto expedita obcaecati ullam aut.</h4>
      <p>Necessitatibus atque iste ullam sapiente dolorum rerum accusantium! Provident, natus sit porro facere enim sed aliquid voluptatum quam voluptate distinctio! Voluptate eveniet libero nesciunt eius dolorum non aut cumque. Neque, labore ea? Saepe debitis nobis voluptas aperiam, ut nemo quas odio reprehenderit iste impedit.</p>
    </div>
  </div>
`;

const firstArticle = article({className: css.article});
firstArticle.insertAdjacentHTML("afterbegin", sanitizeHtml(HTML_MARKUP));

export default firstArticle;
