package com.group.markdownnote;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private static final String TAG = MainActivity.class.getName();
    private static MainActivity instance;

    private ImageButton ib_addBut;
    private TextView tv_title;

    public static MainActivity getInstance() {
        return instance;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initUI();

    }

    //初始化组件以及加监听
    private void initUI() {

        tv_title = findViewById(R.id.title);
        ib_addBut = findViewById(R.id.addBut);

        tv_title.setOnClickListener(this);
        ib_addBut.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.addBut:{
                Intent intent = new Intent(getApplicationContext(), AddMarkdownNoteActivity.class);
                startActivity(intent);
                Toast("添加新的Markdown笔记！");
                break;
            }
            case R.id.title:{
                tv_title.setText("Markdown");
                Toast("修改标题为Markdown！");
                break;
            }
            default:
                break;
        }
    }

    private void Toast(final String string){
        MainActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(MainActivity.this, string, Toast.LENGTH_SHORT).show();
            }
        });
    }


}