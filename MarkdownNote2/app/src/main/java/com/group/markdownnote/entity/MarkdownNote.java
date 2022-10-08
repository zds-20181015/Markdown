package com.group.markdownnote.entity;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class MarkdownNote {
  private int id;
  private String content;
  private Date date;
  private String title;
  private List<String> tags = new ArrayList<String>();

  public MarkdownNote(int id, Date date, String content, String title, String tag) {
      this.id = id;
      this.content = content;
      this.date = date;
      this.title = title;
      setTags(tag);
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getTitle() {
    if (title == null) {
      return "TITLE";
    }
    return title;
  }

  public void setTitle(String title) {
    title = title.replace("\n", "");
    this.title = title;
  }

  public Date getDate() {
    return date;
  }

  public int getId() {
    return id;
  }

  public String getFormattedTags() {
    if (tags == null) return "";
    StringBuilder tg = new StringBuilder();
    for (int i = 0; i < tags.size(); i++) {
      tg.append(tags.get(i)).append(",");
    }
    if (tg.length() < 1) return "";
    return tg.substring(0, tg.length() - 1);
  }

  public void setTags(String str) {
    if (str != null) {
      String[] res = str.split(",");
      tags.addAll(Arrays.asList(res));
    }
  }

  public List<String> getTags() {
    return tags;
  }

  public String getShortContent() {
    String rv = "";
    if (content == null || content.length() < 100) rv = content;
    else rv = content.substring(0, 100) + "...";;
    return rv;
  }

  public String getShortTitle() {
    String rv = "";
    if (title == null || title.length() < 10) rv = getTitle();
    else rv = getTitle().substring(0, 8) + "...";
    return rv;
  }

  public String getDay() {
    SimpleDateFormat sdf = new SimpleDateFormat("dd");
    return sdf.format(date);
  }

  public String getMonth() {
    SimpleDateFormat sdf = new SimpleDateFormat("MMM", Locale.US);
    return sdf.format(date);
  }

  public String getYear() {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
    return sdf.format(date);
  }

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
