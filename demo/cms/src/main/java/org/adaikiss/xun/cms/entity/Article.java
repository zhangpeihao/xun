/**
 * 
 */
package org.adaikiss.xun.cms.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.adaikiss.xun.cms.enumeration.PostStatus;
import org.adaikiss.xun.core.entity.IdEntity;
import org.adaikiss.xun.core.entity.Member;
import org.adaikiss.xun.core.util.Constant;
import org.adaikiss.xun.core.util.PreferenceHelper;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 文章
 * 
 * @author hlw
 * 
 */
@Entity
@Table(name = Constant.TABLE_PREFIX + "article")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@JsonAutoDetect(fieldVisibility = Visibility.NONE, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE, isGetterVisibility = Visibility.NONE)
@JsonInclude(Include.NON_EMPTY)
public class Article extends IdEntity {
	/**
	 * 标题
	 */
	@JsonProperty
	@NotEmpty
	@Size(max = 100)
	private String title;

	/**
	 * 所属栏目
	 */
	private Channel channel;

	/**
	 * 发布者
	 */
	private Member publisher;

	/**
	 * 发布时间
	 */
	@JsonProperty
	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	private Date date;

	/**
	 * 最近修改时间
	 */
	@JsonProperty
	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	private Date modified;

	/**
	 * 最近修改者
	 */
	private Member modifier;

	/**
	 * 内容
	 */
	@JsonProperty
	private String content;

	/**
	 * 摘要
	 */
	@JsonProperty
	private String excerpt;

	/**
	 * 文章作者
	 */
	@JsonProperty
	private String author;

	/**
	 * 文章来源
	 */
	@JsonProperty
	private String origin;

	/**
	 * 文章模板
	 */
	@JsonProperty
	private String tpl;

	/**
	 * 上一篇
	 */
	private Article prev;

	/**
	 * 下一篇
	 */
	private Article next;

	/**
	 * 访问量
	 */
	@JsonProperty
	private long visits;

	/**
	 * 文章权重，权重高的排前面
	 */
	@JsonProperty
	private int weight = 10;

	/**
	 * 关键字
	 */
	@JsonProperty
	private String keywords;

	/**
	 * 文章状态
	 */
	@JsonProperty
	private PostStatus status = PostStatus.UnderVerify;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@ManyToOne
	@JoinColumn(name = "channel_id")
	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}

	@ManyToOne(optional = false)
	@JoinColumn(name = "publisher_id")
	public Member getPublisher() {
		return publisher;
	}

	public void setPublisher(Member publisher) {
		this.publisher = publisher;
	}

	@Temporal(TemporalType.TIMESTAMP)
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Temporal(TemporalType.TIMESTAMP)
	public Date getModified() {
		return modified;
	}

	public void setModified(Date modified) {
		this.modified = modified;
	}

	@ManyToOne
	@JoinColumn(name = "modifier_id")
	public Member getModifier() {
		return modifier;
	}

	public void setModifier(Member modifier) {
		this.modifier = modifier;
	}

	@Lob
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getExcerpt() {
		return excerpt;
	}

	public void setExcerpt(String excerpt) {
		this.excerpt = excerpt;
	}

	@Enumerated(EnumType.STRING)
	public PostStatus getStatus() {
		return status;
	}

	public void setStatus(PostStatus status) {
		this.status = status;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getTpl() {
		return tpl;
	}

	public void setTpl(String tpl) {
		this.tpl = tpl;
	}

	@OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinColumn(name = "prev_id")
	public Article getPrev() {
		return prev;
	}

	public void setPrev(Article prev) {
		this.prev = prev;
	}

	@OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinColumn(name = "next_id")
	public Article getNext() {
		return next;
	}

	public void setNext(Article next) {
		this.next = next;
	}

	public long getVisits() {
		return visits;
	}

	public void setVisits(long visits) {
		this.visits = visits;
	}

	@Column(nullable = false, columnDefinition = "int default 10")
	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	/**
	 * 获取文章url
	 * 
	 * @return
	 */
	@Transient
	public String getUrl() {
		return this.id + PreferenceHelper.getPreference().getPageSuffix();
	}

	/**
	 * 获取文章真实模板，优先使用自身模板，没有则依次取上级栏目的文章模板
	 * 
	 * @return
	 */
	@Transient
	public String getRealTpl() {
		if (StringUtils.isNotBlank(this.tpl)) {
			return this.tpl;
		}
		return this.getChannel().getRealArticleTpl();
	}

	@JsonProperty("prev")
	@Transient
	public String getPrevTitle(){
		if(prev != null){
			return prev.getTitle();
		}
		return null;
	}

	@JsonProperty("next")
	@Transient
	public String getNextTitle(){
		if(next != null){
			return next.getTitle();
		}
		return null;
	}

	@JsonProperty("channelName")
	@Transient
	public String getChannelName(){
		return channel.getName();
	}

	@JsonProperty("channelId")
	@Transient
	public Long getChannelId(){
		return channel.getId();
	}
}
