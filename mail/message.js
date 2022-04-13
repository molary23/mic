module.exports = function getMessage({ sender, details }) {
  let middle,
    website = "//micearnbusiness.org";
  (header = `<html>
  <head> </head>
  <body
    leftmargin="0"
    rightmargin="0"
    topmargin="0"
    marginheight="0"
    style="font-family: \'Georgia\', Helvetica, serif"
  >
    <table
      border="0"
      style="width: 100%; background-color: #ffffff; padding: 0px"
      align="center"
    >
      <tbody>
        <tr>
          <td align="center" style="padding: 0px">
            <table border="0" align="center" style="padding: 0px">
              <tbody>
                <tr>
                  <td
                    class="horizontal_sapcing"
                    width="12"
                    style="
                      min-width: 12px;
                      padding: 0px;
                      font-size: 0px;
                      line-height: 1px;
                      padding: 0px;
                    "
                  >
                    &nbsp;
                  </td>
                  <td
                    class="horizontal_sapcing"
                    style="
                      padding: 0px;
                      font-size: 0px;
                      line-height: 1px;
                      padding: 0px;
                    "
                  >
                    <table
                      border="0"
                      class="wrapper"
                      style="padding: 0px; width: 448px"
                    >
                      <tbody>
                        <tr>
                          <td align="center" style="padding: 0px">
                            <table
                              border="0"
                              style="min-width: 100%; padding: 0px"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    height="24"
                                    style="height: 24px; padding: 0px"
                                  ></td>
                                </tr>
                                <tr>
                                  <td align="center" style="padding: 0px">
                                    <table
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      align="center"
                                      width="100%"
                                      style="min-width: 100%; padding: 0px"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="horizontal_sapcing"
                                            style="
                                              padding: 0px;
                                              font-size: 0px;
                                              line-height: 1px;
                                              padding: 0px;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                              align="left"
                                              style="padding: 0px"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 0px">
                                                    <a
                                                      href="${website}"
                                                    >
                                                      <img
                                                        src="https://micearnbusiness.org/images/logo.png"
                                                        height="32"
                                                        class="logoImage"
                                                        style="
                                                          border: none;
                                                          border-radius: 24px;
                                                        "
																												alt="MIC Earn Business Logo"
                                                      />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table
                                              border="0"
                                              align="right"
                                              style="padding: 0px"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="right"
                                                    valign="top"
                                                    style="
                                                      padding: 0px;
                                                      font-family: Helvetica,
                                                        Arial, sans-serif;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                      color: #31373b;
                                                      padding: 0px;
                                                    "
                                                  >
                                                    <p
                                                      style="margin-bottom: 2px"
                                                    >
                                                      MIC Earn Business
                                                    </p>
                                                    <p style="margin-top: 2px">
                                                      Company Motto
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            height="12"
                                            style="height: 12px; padding: 0px"
                                          ></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>`),
    (footer = `<tr>
                          <td
                            class="footer_made"
                            style="
                              padding: 0px;
                              font-family: Helvetica, Arial, sans-serif;
                              color: #8899a6;
                              font-size: 12px;
                              padding: 0px;
                              font-weight: normal;
                              line-height: 12px;
                            "
                            align="center"
                          >
                            Connect and Join the Conversation:&nbsp;&nbsp;
                            <a
                              href="https://facebook.com/"
                              style="
                                text-decoration: none;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #8899a6;
                                font-size: 12px;
                                padding: 0px;
                                font-weight: normal;
                                line-height: 12px;
                                display: inline-block;
                              "
                              target="_blank"
                            >
                              <img
                                src="https://micearnbusiness.org/images/facebook.png"
                                style="height: 20px"
                              />
                            </a>
                            &nbsp;&nbsp;
                            <a
                              href="https://twitter.com/MicEarn"
                              style="
                                text-decoration: none;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #8899a6;
                                font-size: 12px;
                                padding: 0px;
                                font-weight: normal;
                                line-height: 12px;
                                display: inline-block;
                              "
                              target="_blank"
                            >
                              <img
                                src="https://micearnbusiness.org/images/twitter.png"
                                style="height: 20px"
                              />
                            </a>
                            &nbsp;&nbsp;
                            <a
                              href="https://instagram.com/"
                              style="
                                text-decoration: none;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #8899a6;
                                font-size: 12px;
                                padding: 0px;
                                font-weight: normal;
                                line-height: 12px;
                                display: inline-block;
                              "
                              target="_blank"
                            >
                              <img
                                src="https://micearnbusiness.org/images/instagram.png"
                                style="height: 20px"
                              />
                            </a>
                            &nbsp;&nbsp;
														 <a
                              href="https://linkedin.com/in/"
                              style="
                                text-decoration: none;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #8899a6;
                                font-size: 12px;
                                padding: 0px;
                                font-weight: normal;
                                line-height: 12px;
                                display: inline-block;
                              "
                              target="_blank"
                            >
                              <img
                                src="https://micearnbusiness.org/images/linkedin.png"
                                style="height: 20px"
                              />
                            </a>
                            &nbsp;&nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="height: 10px; padding: 0px"
                            height="10"
                          ></td>
                        </tr>
                        <tr>
                          <td style="padding: 0px" align="center">
                            <table
                              style="padding: 0px"
                              width="100%"
                              border="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="horizontal_sapcing"
                                    style="
                                      padding: 0px;
                                      font-size: 0px;
                                      line-height: 1px;
                                      padding: 0px;
                                    "
                                    width="48"
                                  >
                                    &nbsp;
                                  </td>
                                  <td style="padding: 0px" align="center">
                                    <span
                                      class="addressLink"
                                      style="
                                        font-family: Helvetica, Arial,
                                          sans-serif;
                                        font-size: 12px;
                                        padding: 0px;
                                        font-weight: normal;
                                        line-height: 16px;
                                        color: #8899a6 !important;
                                      "
                                    >
                                      Copyright &copy;
                                      <a
                                        href="${website}"
                                        style="
                                          color: #8899a6 !important;
                                          text-decoration: none !important;
                                          text-decoration: none;
                                        "
                                        target="_blank"
                                      >
                                        <strong>MIC</strong>Earn Business
                                      </a>
                                      ${new Date().getFullYear()}
                                    </span>
                                  </td>
                                  <td
                                    class="horizontal_sapcing"
                                    style="
                                      padding: 0px;
                                      font-size: 0px;
                                      line-height: 1px;
                                      padding: 0px;
                                    "
                                    width="48"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`);

  if (sender === "verify") {
    middle = `<tr>
                          <td align="center" style="padding: 0px">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              width="100%"
                              style="min-width: 100%; padding: 0px"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    align="left"
                                    style="padding: 0px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      style="
                                        min-width: 100%;
                                        width: 100%;
                                        padding: 0px;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="post_box_b"
                                            style="
                                              padding: 0px;
                                              border: 1px solid #dbdbdb;
                                              background-color: #ffffff;
                                              border-radius: 5px;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                              style="
                                                min-width: 100%;
                                                width: 100%;
                                                padding: 0px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 10px
                                                                                0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              text-align: center;
                                                                              color: #646464;
                                                                              text-transform: uppercase;
                                                                            "
                                                                          >
                                                                            Verify
                                                                            Email
                                                                            Address
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="20"
                                                            style="
                                                              min-height: 20px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="20"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 20px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              color: #646464;
                                                                            "
                                                                          >
                                                                            <p
                                                                              style="
                                                                                font-weight: 600;
                                                                                text-transform:capitalize;
                                                                              "
                                                                            >
                                                                              Dear
                                                                              ${details.username}
                                                                            </p>

                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                font-size: 16px;
                                                                              "
                                                                            >
                                                                              You
                                                                              are
                                                                              receiving
                                                                              this
                                                                              email
                                                                              because
                                                                              you
                                                                              signed
                                                                              up
                                                                              with
                                                                              this
                                                                              email
                                                                              account.
                                                                            </p>

                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                font-size: 16px;
                                                                              "
                                                                            >
                                                                              To
                                                                              finalise
                                                                              your
                                                                              registration,
                                                                              you
                                                                              have
                                                                              to
                                                                              verify
                                                                              your
                                                                              email
                                                                              address.
                                                                              To
                                                                              verify
                                                                              your
                                                                              email
                                                                              address.
                                                                            </p>
                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                font-size: 16px;
                                                                              "
                                                                            >
                                                                              Please
                                                                              click
                                                                              the
                                                                              button
                                                                              below
                                                                              to
                                                                              verify
                                                                              your
                                                                              email
                                                                              address.
                                                                            </p>
                                                                            <div
                                                                              style="
                                                                                margin: 30px
                                                                                  auto;
                                                                                text-align: center;
                                                                              "
                                                                            >
                                                                              <a
                                                                                href="//dashboard.micearnbusiness.org/verify?refer=${details.urldata}"
                                                                                style="
                                                                                  background: #314297;
                                                                                  padding: 10px
                                                                                    20px;
                                                                                  text-decoration: none;
                                                                                  color: #fff;
                                                                                  border-radius: 5px;
                                                                                "
                                                                              >
                                                                                Verify
                                                                                Email
                                                                                Address
                                                                              </a>
                                                                            </div>

                                                                            <div></div>
                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                font-size: 16px;
                                                                              "
                                                                            >
                                                                              If
                                                                              you
                                                                              are
                                                                              having
                                                                              trouble
                                                                              using
                                                                              the
                                                                              button
                                                                              above,
                                                                              copy
                                                                              the
                                                                              code
                                                                              below
                                                                              and
                                                                              paste

                                                                              <a
                                                                                href="//dashboard.micearnbusiness.org/verify"
                                                                                style="text-decoration: none;">here</a
                                                                              >
                                                                            </p>
                                                                            <p
                                                                              style="
                                                                                font-size: 18px;
                                                                                text-align: center;
                                                                                letter-spacing: 5px;
                                                                                text-transform: uppercase;
                                                                              "
                                                                            >
                                                                              ${details.code}
                                                                            </p>

                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                              "
                                                                            >
                                                                              Thanks,
                                                                            </p>
                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                padding:10px 0px;
                                                                              "
                                                                            >
                                                                              MIC
                                                                              Earn
                                                                              Business
                                                                            </p>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="20"
                                    class="made_space"
                                    style="padding: 0px; min-height: 20px"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>`;
  } else if (sender === "forgot") {
    middle = `<tr>
                          <td align="center" style="padding: 0px">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              width="100%"
                              style="min-width: 100%; padding: 0px"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    align="left"
                                    style="padding: 0px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      style="
                                        min-width: 100%;
                                        width: 100%;
                                        padding: 0px;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="post_box_b"
                                            style="
                                              padding: 0px;
                                              border: 1px solid #dbdbdb;
                                              background-color: #ffffff;
                                              border-radius: 5px;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                              style="
                                                min-width: 100%;
                                                width: 100%;
                                                padding: 0px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 10px
                                                                                0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              text-align: center;
                                                                              color: #646464;
                                                                              text-transform: uppercase;
                                                                            "
                                                                          >
                                                                            Password
                                                                            Reset
                                                                            Request
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="20"
                                                            style="
                                                              min-height: 20px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="20"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 20px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              color: #646464;
                                                                            "
                                                                          >
                                                                            <p
                                                                              style="
                                                                                font-weight: 600;
                                                                              "
                                                                            >
                                                                              Dear
                                                                              ${details.username}
                                                                            </p>

                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                font-size: 16px;
                                                                              "
                                                                            >
                                                                              You
                                                                              are
                                                                              receiving
                                                                              this
                                                                              email
                                                                              because
                                                                              you
                                                                              have
                                                                              requested
                                                                              for
                                                                              a
                                                                              Password
                                                                              reset
                                                                              link.
                                                                            </p>
                                                                            <div
                                                                              style="
                                                                                margin: 30px
                                                                                  auto;
                                                                                text-align: center;
                                                                              "
                                                                            >
                                                                              <a
                                                                                href="//dashboard.micearnbusiness.org/confirm?auth=yes&refer=${details.urldata}"
                                                                                style="
                                                                                  background: #314297;
                                                                                  padding: 10px
                                                                                    20px;
                                                                                  text-decoration: none;
                                                                                  color: #fff;
                                                                                  border-radius: 5px;
                                                                                "
                                                                              >
                                                                                Reset
                                                                                Password
                                                                              </a>
                                                                            </div>
                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                font-size: 16px;
                                                                              "
                                                                            >
                                                                              If
                                                                              you
                                                                              are
                                                                              having
                                                                              trouble
                                                                              using
                                                                              the
                                                                              button
                                                                              above,
                                                                              copy
                                                                              the
                                                                              code
                                                                              below
                                                                              and
                                                                              paste

                                                                              <a
                                                                                href="//dashboard.micearnbusiness.org/confirm"
                                                                                style="
                                                                                  text-decoration: none;
                                                                                "
                                                                                >here</a
                                                                              >
                                                                            </p>
                                                                            <p
                                                                              style="
                                                                                font-size: 18px;
                                                                                text-align: center;
                                                                                letter-spacing: 5px;
                                                                                text-transform: uppercase;
                                                                              "
                                                                            >
                                                                              ${details.code}
                                                                            </p>
                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                font-size: 16px;
                                                                              "
                                                                            >
                                                                              If
                                                                              you
                                                                              didn't
                                                                              make this request, please 
                                                                              <a
                                                                                href="/dashboard.micearnbusiness.org/confirm?auth=no&refer=${details.urldata}"
                                                                                style="
                                                                                  text-decoration: none;
                                                                                "
                                                                                >secure
                                                                                your
                                                                                account.</a
                                                                              >
                                                                            </p>
                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                              "
                                                                            >
                                                                              Thanks,
                                                                            </p>
                                                                            <p
                                                                              style="
                                                                                color: #afafaf;
                                                                                padding:10px 0px;
                                                                              "
                                                                            >
                                                                              MIC
                                                                              Earn
                                                                              Business
                                                                            </p>
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="20"
                                    class="made_space"
                                    style="padding: 0px; min-height: 20px"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>`;
  } else if (sender === "editsignal") {
    let newpip, paddedid, newstatus;
    if (details.pip === 0) {
      newpip = `<img src="https://micearnbusiness.org/images/right.svg" style=" width: 3.5%;"/>`;
    } else if (details.pip > 0) {
      newpip = `<img src="https://micearnbusiness.org/images/up.svg" style=" width: 3.5%;" />`;
    } else if (details.pip < 0) {
      newpip = `<img src="https://micearnbusiness.org/images/down.svg" style=" width: 3.5%;" />`;
    }
    if (details.signalid.toString().length < 5) {
      paddedid = details.signalid.toString().padStart(5, "0");
    } else {
      paddedid = details.signalid.toString();
    }

    if (details.status === "s") {
      newstatus = "Successful";
    } else if (details.status === "f") {
      newstatus = "Failed";
    } else if (details.status === "c") {
      newstatus = "Cancelled";
    }

    middle = `<tr>
                          <td
                            align="center"
                            style="
                              padding: 0px;
                              font-family: Helvetica, Arial, sans-serif;
                              font-weight: 600;
                              color: #fff;
                              font-size: 18px;
                              line-height: 40px;
                              padding: 0px;
                              background-color: #314297;
                              padding: 1.5vh 0vw;
                              text-transform: capitalize;
                            "
                          >
                            a signal status has changed.
                          </td>
                        </tr>

                        <tr>
                          <td
                            height="12"
                            style="height: 12px; padding: 0px"
                          ></td>
                        </tr>

                        <tr>
                          <td align="center" style="padding: 0px">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              width="100%"
                              style="min-width: 100%; padding: 0px"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    align="left"
                                    style="padding: 0px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      style="
                                        min-width: 100%;
                                        width: 100%;
                                        padding: 0px;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="post_box_b"
                                            style="
                                              padding: 0px;
                                              border: 1px solid #dbdbdb;
                                              background-color: #ffffff;
                                              border-radius: 5px;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                              style="
                                                min-width: 100%;
                                                width: 100%;
                                                padding: 0px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                              text-transform:uppercase;
                                                                            "
                                                                          >
                                                                          ${
                                                                            JSON.parse(
                                                                              details.firstcurrency
                                                                            )[1] +
                                                                            "/" +
                                                                            JSON.parse(
                                                                              details.secondcurrency
                                                                            )[1]
                                                                          }
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                           ${newpip}

                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Signal
                                                                            Identifier
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                             ${paddedid}
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Signal
                                                                            Status
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${newstatus}
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Signal
                                                                            Provider
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${
                                                                              details.provider
                                                                            }
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    height="20"
                                    class="made_space"
                                    style="padding: 0px; min-height: 20px"
                                  ></td>
                                </tr>
                                <tr>
                                  <td>
                                    <p
                                      style="
                                        text-align: center;
                                        color: #afafaf;
                                        font-size: 16px;
                                        padding:10px 0px;
                                      "
                                    >
                                      View this Signal in
                                      <a
                                        href="//dashboard.micearnbusiness.org/user/signal"
                                        >Browser</a
                                      >.
                                    </p>
                                    <p style="color: #afafaf; font-size: 12px padding:10px 0px;">
                                      You are receiving this mail because you
                                      subscribed to receiving Signal Updates
                                      from MIC Earn Business. </p>
                                      <p style="color: #afafaf; font-size: 12px padding:10px 0px;">To stop receiving
                                      this updates
                                      <a
                                        href="//dashboard.micearnbusiness.org/user/settings"
                                        >Unsubscribe</a
                                      >.
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="20"
                                    class="made_space"
                                    style="padding: 0px; min-height: 20px"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>`;
  } else if (sender === "addsignal") {
    let paddedid, option, newpip;
    if (details.signalid.toString().length < 5) {
      paddedid = details.signalid.toString().padStart(5, "0");
    } else {
      paddedid = details.signalid.toString();
    }
    if (details.pip === 0) {
      newpip = `<img src="//micearnbusiness.org/images/right.svg" style=" width: 3.5%;" />`;
    } else if (details.pip > 0) {
      newpip = `<img src="//micearnbusiness.org/images/up.svg" style=" width: 3.5%;" />`;
    } else if (details.pip < 0) {
      newpip = `<img src="//micearnbusiness.org/images/down.svg" style=" width: 3.5%;" />`;
    }

    if (details.signaloption === "b") {
      option = "Buy";
    } else {
      option = "Sell";
    }

    middle = ` <tr>
                          <td
                            align="center"
                            style="
                              padding: 0px;
                              font-family: Helvetica, Arial, sans-serif;
                              font-weight: 600;
                              color: #fff;
                              font-size: 18px;
                              line-height: 40px;
                              padding: 0px;
                              background-color: #314297;
                              padding: 1.5vh 0vw;
                              text-transform: capitalize;
                            "
                          >
                            a new signal has been created.
                          </td>
                        </tr>

                        <tr>
                          <td
                            height="12"
                            style="height: 12px; padding: 0px"
                          ></td>
                        </tr>

                        <tr>
                          <td align="center" style="padding: 0px">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              width="100%"
                              style="min-width: 100%; padding: 0px"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    valign="top"
                                    align="left"
                                    style="padding: 0px"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                      style="
                                        min-width: 100%;
                                        width: 100%;
                                        padding: 0px;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="post_box_b"
                                            style="
                                              padding: 0px;
                                              border: 1px solid #dbdbdb;
                                              background-color: #ffffff;
                                              border-radius: 5px;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                              style="
                                                min-width: 100%;
                                                width: 100%;
                                                padding: 0px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                              text-transform:uppercase;
                                                                            "
                                                                          >
                                                                            ${
                                                                              JSON.parse(
                                                                                details.firstcurrency
                                                                              )[1] +
                                                                              "/" +
                                                                              JSON.parse(
                                                                                details.secondcurrency
                                                                              )[1]
                                                                            }
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${newpip}
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Signal
                                                                            Option
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${option}
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Signal
                                                                            Identifier
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${paddedid}
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Start Range
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${
                                                                              details.startrange
                                                                            }
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            End Range
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${
                                                                              details.endrange
                                                                            }
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                   ${JSON.parse(
                                                     details.takeprofit
                                                   ).map((item, i) => {
                                                     return `<tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Take
                                                                            Profit ${i}
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${item}
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>`;
                                                   })} 


    ${JSON.parse(details.stoploss).map((item, i) => {
      return `<tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Stop
                                                                            Loss ${i}
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${item}
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>`;
    })}                                            

                                                

                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Profit,
                                                                            Pip
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${
                                                                              details.pip
                                                                            }
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr class="row">
                                                  <td style="padding: 0px">
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      class="bottom_line"
                                                      style="
                                                        padding: 0px;
                                                        min-width: 100%;
                                                        width: 100%;
                                                        border-bottom: 1px solid
                                                          #dbdbdb;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            style="padding: 0px"
                                                          >
                                                            <table
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              border="0"
                                                              style="
                                                                min-width: 100%;
                                                                width: 100%;
                                                                padding: 0px;
                                                              "
                                                            >
                                                              <tbody>
                                                                <tr>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                  <td
                                                                    style="
                                                                      padding: 0px;
                                                                    "
                                                                  >
                                                                    <table
                                                                      cellpadding="0"
                                                                      cellspacing="0"
                                                                      border="0"
                                                                      style="
                                                                        min-width: 100%;
                                                                        width: 100%;
                                                                        padding: 0px;
                                                                      "
                                                                    >
                                                                      <tbody>
                                                                        <tr>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 18px;
                                                                              line-height: 20px;
                                                                              font-weight: 600;
                                                                              color: #14171a;
                                                                            "
                                                                          >
                                                                            Signal Provider
                                                                          </td>
                                                                          <td
                                                                            class="head_title"
                                                                            style="
                                                                              padding: 0px;
                                                                              font-family: Helvetica,
                                                                                Arial,
                                                                                sans-serif;
                                                                              font-size: 12px;
                                                                              line-height: 16px;
                                                                              color: #14171a;
                                                                              text-align: right;
                                                                              font-size: 20px;
                                                                            "
                                                                          >
                                                                            ${
                                                                              details.provider
                                                                            }
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                  <td
                                                                    width="24"
                                                                    class="made_margin"
                                                                    style="
                                                                      padding: 0px;
                                                                      width: 24px;
                                                                    "
                                                                  ></td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            height="12"
                                                            style="
                                                              min-height: 12px;
                                                              padding: 0px;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    height="20"
                                    class="made_space"
                                    style="padding: 0px; min-height: 20px"
                                  ></td>
                                </tr>
                                <tr>
                                  <td>
                                    <p
                                      style="
                                        text-align: center;
                                        color: #afafaf;
                                        font-size: 16px;
                                        padding:10px 0px;
                                      "
                                    >
                                      View this Signal in
                                      <a
                                        href="//dashboard.micearnbusiness.org/user/signal"
                                        >Browser</a
                                      >.
                                    </p>
                                    <p style="color: #afafaf; font-size: 12px padding:10px 0px;">
                                      You are receiving this mail because you
                                      subscribed to receiving Signal Updates
                                      from MIC Earn Business.</p> <p style="color: #afafaf; font-size: 12px padding:10px 0px;">To stop receiving
                                      this updates
                                      <a
                                        href="//dashboard.micearnbusiness.org/user/settings"
                                        >Unsubscribe</a
                                      >.
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="20"
                                    class="made_space"
                                    style="padding: 0px; min-height: 20px"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>`;
  }
  const content = `${header}${middle}${footer}`;
  return content;
};
