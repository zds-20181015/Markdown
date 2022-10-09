package com.group.markdownnote;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;

import androidx.appcompat.app.AppCompatActivity;

import com.group.markdownnote.entity.MarkdownNote;
import com.group.markdownnote.entity.MyApp;
import com.group.markdownnote.utils.ToastUtils;

import java.util.ArrayList;
import java.util.Date;

public class AddMarkdownNoteActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String TAG = AddMarkdownNoteActivity.class.getName();
    private MyApp mApp;
    private ArrayList<MarkdownNote> noteArrayList;
    private int mId;

    private ImageButton bt_go_back;
    private ImageButton bt_confirm;
    private EditText et_title;
    private EditText et_content;

    private ImageButton bt_preview, bt_format, bt_listb, bt_listn, bt_link, bt_quote;
    private ImageButton bt_codeb, bt_bold, bt_bk, bt_image, bt_camera, bt_italic;
    private Button bt_txt, bt_h1, bt_h2, bt_h3, bt_h4, bt_h5, bt_h6;
    private WebView wv_markdown_note;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_markdown_note);

        mApp = (MyApp) getApplication();
        noteArrayList = mApp.getNoteArrayList();
        mId = mApp.getId();

        initUI();
        initListener();
        et_content.setVisibility(View.VISIBLE);

        wv_markdown_note.loadUrl("file:///android_asset/index.html");
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

        wv_markdown_note = findViewById(R.id.wv_markdown_note);
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

        wv_markdown_note.setOnClickListener(this);
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.bt_go_back:{
                //返回主页
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
                break;
            }

            case R.id.bt_confirm:{
                //获取笔记内容，存入数组noteArrayList
                String title = et_title.getText().toString();
                String content = et_content.getText().toString();
                Date data =new Date();
                MarkdownNote note = new MarkdownNote(mId, data, content, title, null);
                mApp.setId(mId + 1);//ID自增
                noteArrayList.add(note);
                for (int i = 0; i < noteArrayList.size(); i++){
                    Log.d(TAG, "noteArrayList[" + i +"] = "+ noteArrayList.get(i).toString());
                }

                //返回主页
                ToastUtils.showToast(getApplicationContext(),String.format("添加标题为[%s]的笔记成功！",et_title.getText()));
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);
                break;
            }

            case R.id.bt_bold:{

                sendToJS("**Text**");
            }

            default:
                break;
        }
    }

    public void sendToJS(String msg) {
        if (msg == null) return;
        if (true) {
            int index = et_content.getSelectionStart();
            Editable editable = et_content.getText();
            editable.insert(index, msg);
        } else {
            msg = convert(msg);
            wv_markdown_note.loadUrl("javascript:insert(" + "\"" + msg + "\"" + ");");
        }
    }

    public static String convert(String string) {
        StringBuffer unicode = new StringBuffer();

        for (int i = 0; i < string.length(); i++) {
            // 取出每一个字符
            char c = string.charAt(i);
            // 转换为unicode
            unicode.append(String.format("\\u%04x", Integer.valueOf(c)));
        }
        return unicode.toString();
    }


}
