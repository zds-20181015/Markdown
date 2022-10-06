package com.group.markdownnote;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class AddMarkdownNoteActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String TAG = AddMarkdownNoteActivity.class.getName();

    private ImageButton bt_go_back;
    private ImageButton bt_confirm;
    private EditText et_title;
    private EditText et_content;

    private ImageButton bt_preview, bt_format, bt_listb, bt_listn, bt_link, bt_quote;
    private ImageButton bt_codeb, bt_bold, bt_bk, bt_image, bt_camera, bt_italic;
    private Button bt_txt, bt_h1, bt_h2, bt_h3, bt_h4, bt_h5, bt_h6;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_markdown_note);
        initUI();
        initListener();

    }

    private void initUI() {
        bt_go_back = findViewById(R.id.bt_go_back);
        bt_confirm = findViewById(R.id.bt_confirm);
        et_title = findViewById(R.id.et_title);
        et_content  = findViewById(R.id.et_content);

        bt_preview = findViewById(R.id.bt_preview);
        bt_format = findViewById(R.id.bt_format);
        bt_listb = findViewById(R.id.bt_listb);
        bt_listn = findViewById(R.id.bt_listn);
        bt_link = findViewById(R.id.bt_link);
        bt_quote = findViewById(R.id.bt_quote);
        bt_codeb = findViewById(R.id.bt_codeb);
        bt_bold = findViewById(R.id.bt_bold);
        bt_bk = findViewById(R.id.bt_bk);
        bt_image = findViewById(R.id.bt_image);
        bt_camera = findViewById(R.id.bt_camera);
        bt_italic = findViewById(R.id.bt_italic);

        bt_txt = findViewById(R.id.bt_txt);
        bt_h1 = findViewById(R.id.bt_h1);
        bt_h2 = findViewById(R.id.bt_h2);
        bt_h3 = findViewById(R.id.bt_h3);
        bt_h4 = findViewById(R.id.bt_h4);
        bt_h5 = findViewById(R.id.bt_h5);
        bt_h6 = findViewById(R.id.bt_h6);
    }

    private void initListener() {
        bt_go_back.setOnClickListener(this);
        bt_confirm.setOnClickListener(this);
        et_title.setOnClickListener(this);
        et_content.setOnClickListener(this);

        bt_preview.setOnClickListener(this);
        bt_format.setOnClickListener(this);
        bt_listb.setOnClickListener(this);
        bt_listn.setOnClickListener(this);
        bt_link.setOnClickListener(this);
        bt_quote.setOnClickListener(this);
        bt_codeb.setOnClickListener(this);
        bt_bold.setOnClickListener(this);
        bt_bk.setOnClickListener(this);
        bt_image.setOnClickListener(this);
        bt_camera.setOnClickListener(this);
        bt_italic.setOnClickListener(this);

        bt_txt.setOnClickListener(this);
        bt_h1.setOnClickListener(this);
        bt_h2.setOnClickListener(this);
        bt_h3.setOnClickListener(this);
        bt_h4.setOnClickListener(this);
        bt_h5.setOnClickListener(this);
        bt_h6.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.bt_go_back:{
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
                Toast("返回成功！");
                break;
            }
            case R.id.bt_confirm:{
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
                Toast(String.format("添加标题为 %s 的笔记成功！",et_title.getText()));
                break;
            }
            default:
                break;
        }
    }

    private void Toast(final String string){
        AddMarkdownNoteActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(AddMarkdownNoteActivity.this, string, Toast.LENGTH_SHORT).show();
            }
        });
    }
}
