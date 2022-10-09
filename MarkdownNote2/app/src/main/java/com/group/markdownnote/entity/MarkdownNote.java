package com.group.markdownnote.entity;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class MarkdownNote {
    private int id;
    private String content;
    private Date date;
    private String title;
    private List<String> tags = new ArrayList<>();

    public MarkdownNote(int id, Date date, String content, String title, String tags) {
        this.id = id;
        this.date = date;
        this.content = content;
        this.title = title;
        setTags(tags);
    }

    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        title = title.replace("\n", "");
        this.title = title;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(String str) {
        if (str != null) {
            String[] str_array = str.split(",");
            tags.addAll(Arrays.asList(str_array));
        }
    }

    public String getShortContent() {
        String str = "";
        if (content == null || content.length() < 100) {
            str = content;
        } else {
            str = content.substring(0, 100) + "...";
        };
        return str;
    }

    public String getShortTitle() {
        String str = "";
        if (title == null || title.length() < 10) {
            str = getTitle();
        } else {
            str = getTitle().substring(0, 8) + "...";
        }
        return str;
    }

    @NonNull
    @Override
    public String toString() {
        return "MarkdownNote{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", date=" + date +
                ", title='" + title + '\'' +
                ", tags=" + tags +
                '}';
    }
}
